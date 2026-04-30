from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class SupportRequestCreate(BaseModel):
    category_id: str = Field(min_length=1, max_length=64)
    category_title: str = Field(min_length=1, max_length=120)

    problem_id: str = Field(min_length=1, max_length=120)
    problem_title: str = Field(min_length=1, max_length=180)

    urgency_id: str = Field(min_length=1, max_length=64)
    urgency_title: str = Field(min_length=1, max_length=120)

    organization: str = Field(default="", max_length=200)
    contact_name: str = Field(default="", max_length=160)
    phone: str = Field(default="", max_length=80)

    description: str = Field(min_length=5, max_length=4000)

    init_data: str | None = Field(default=None, max_length=12000)
    max_user_id: str | None = Field(default=None, max_length=80)
    max_username: str | None = Field(default=None, max_length=160)


class SupportRequestRead(BaseModel):
    id: int
    request_number: str

    category_id: str
    category_title: str

    problem_id: str
    problem_title: str

    urgency_id: str
    urgency_title: str

    organization: str
    contact_name: str
    phone: str
    description: str

    status: str
    source: str

    max_user_id: str | None
    max_username: str | None

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SupportRequestListResponse(BaseModel):
    items: list[SupportRequestRead]
    total: int