from datetime import datetime, timezone
from enum import Enum

from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class RequestStatus(str, Enum):
    NEW = "new"
    IN_PROGRESS = "in_progress"
    WAITING_CLIENT = "waiting_client"
    DONE = "done"
    CANCELLED = "cancelled"


class SupportRequest(Base):
    __tablename__ = "support_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    request_number: Mapped[str] = mapped_column(
        String(32),
        unique=True,
        index=True,
        nullable=False,
    )

    category_id: Mapped[str] = mapped_column(String(64), nullable=False)
    category_title: Mapped[str] = mapped_column(String(120), nullable=False)

    problem_id: Mapped[str] = mapped_column(String(120), nullable=False)
    problem_title: Mapped[str] = mapped_column(String(180), nullable=False)

    urgency_id: Mapped[str] = mapped_column(String(64), nullable=False)
    urgency_title: Mapped[str] = mapped_column(String(120), nullable=False)

    organization: Mapped[str] = mapped_column(String(200), default="", nullable=False)
    contact_name: Mapped[str] = mapped_column(String(160), default="", nullable=False)
    phone: Mapped[str] = mapped_column(String(80), default="", nullable=False)

    description: Mapped[str] = mapped_column(Text, nullable=False)

    status: Mapped[str] = mapped_column(
        String(32),
        default=RequestStatus.NEW.value,
        nullable=False,
        index=True,
    )

    source: Mapped[str] = mapped_column(String(64), default="webapp", nullable=False)

    max_user_id: Mapped[str | None] = mapped_column(String(80), nullable=True)
    max_username: Mapped[str | None] = mapped_column(String(160), nullable=True)
    raw_init_data: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )