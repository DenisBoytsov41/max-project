from datetime import datetime

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models import SupportRequest


def build_request_number(db: Session) -> str:
    today_prefix = datetime.now().strftime("KS-%Y%m%d")

    count_statement = select(func.count()).where(
        SupportRequest.request_number.like(f"{today_prefix}-%")
    )

    today_count = db.scalar(count_statement) or 0
    next_number = today_count + 1

    return f"{today_prefix}-{next_number:04d}"