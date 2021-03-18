export default function mapResponseErrors(response) {
  return response.errors.map((error) => error.detail);
}
