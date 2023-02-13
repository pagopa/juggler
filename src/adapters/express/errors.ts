import { ProblemDetail } from './generated/apicodec/ProblemDetail';

// Following the structure defined by RFC7807 (https://www.rfc-editor.org/rfc/rfc7807#section-3.1)
export const problemDetail500: ProblemDetail = {
  // FIXME: fix this cast!
  status: 500 as unknown as ProblemDetail['status'],
  title: 'Something really bad happened.',
  detail: "I don't have any detail at the moment.",
};
