from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import SupportRequest
from app.schemas import (
    SupportRequestCreate,
    SupportRequestListResponse,
    SupportRequestRead,
)
from app.services.request_numbers import build_request_number

router = APIRouter(prefix="/requests", tags=["requests"])


@router.post(
    "",
    response_model=SupportRequestRead,
    status_code=status.HTTP_201_CREATED,
)
def create_support_request(
    payload: SupportRequestCreate,
    db: Session = Depends(get_db),
) -> SupportRequestRead:
    request = SupportRequest(
        request_number=build_request_number(db),
        category_id=payload.category_id,
        category_title=payload.category_title,
        problem_id=payload.problem_id,
        problem_title=payload.problem_title,
        urgency_id=payload.urgency_id,
        urgency_title=payload.urgency_title,
        organization=payload.organization.strip(),
        contact_name=payload.contact_name.strip(),
        phone=payload.phone.strip(),
        description=payload.description.strip(),
        raw_init_data=payload.init_data,
        max_user_id=payload.max_user_id,
        max_username=payload.max_username,
    )

    db.add(request)
    db.commit()
    db.refresh(request)

    return SupportRequestRead.model_validate(request)


@router.get("", response_model=SupportRequestListResponse)
def list_support_requests(
    db: Session = Depends(get_db),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
) -> SupportRequestListResponse:
    total = db.scalar(select(func.count()).select_from(SupportRequest)) or 0

    statement = (
        select(SupportRequest)
        .order_by(SupportRequest.created_at.desc())
        .limit(limit)
        .offset(offset)
    )

    requests = list(db.scalars(statement).all())

    items = [
        SupportRequestRead.model_validate(request)
        for request in requests
    ]

    return SupportRequestListResponse(
        items=items,
        total=total,
    )


@router.get("/{request_key}", response_model=SupportRequestRead)
def get_support_request(
    request_key: str,
    db: Session = Depends(get_db),
) -> SupportRequestRead:
    if request_key.isdigit():
        statement = select(SupportRequest).where(SupportRequest.id == int(request_key))
    else:
        statement = select(SupportRequest).where(
            SupportRequest.request_number == request_key
        )

    request = db.scalar(statement)

    if request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Заявка не найдена",
        )

    return SupportRequestRead.model_validate(request)