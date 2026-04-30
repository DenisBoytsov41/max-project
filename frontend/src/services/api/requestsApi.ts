export type CreateSupportRequestPayload = {
  category_id: string;
  category_title: string;

  problem_id: string;
  problem_title: string;

  urgency_id: string;
  urgency_title: string;

  organization: string;
  contact_name: string;
  phone: string;

  description: string;

  init_data?: string | null;
  max_user_id?: string | null;
  max_username?: string | null;
};

export type SupportRequestResponse = {
  id: number;
  request_number: string;

  category_id: string;
  category_title: string;

  problem_id: string;
  problem_title: string;

  urgency_id: string;
  urgency_title: string;

  organization: string;
  contact_name: string;
  phone: string;
  description: string;

  status: string;
  source: string;

  max_user_id: string | null;
  max_username: string | null;

  created_at: string;
  updated_at: string;
};

type ApiErrorResponse = {
  detail?: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

function buildApiUrl(path: string): string {
  const normalizedBaseUrl = API_BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
}

async function parseErrorResponse(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as ApiErrorResponse;

    if (typeof data.detail === 'string') {
      return data.detail;
    }

    return `Ошибка API: ${response.status}`;
  } catch {
    return `Ошибка API: ${response.status}`;
  }
}

export async function createSupportRequest(
  payload: CreateSupportRequestPayload,
): Promise<SupportRequestResponse> {
  const response = await fetch(buildApiUrl('/api/requests'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await parseErrorResponse(response);
    throw new Error(message);
  }

  return response.json() as Promise<SupportRequestResponse>;
}