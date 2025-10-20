export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">오류가 발생했습니다</h1>
        <p className="mt-4 text-gray-600">
          인증 중 문제가 발생했습니다. 다시 시도해주세요.
        </p>
        <a
          href="/login"
          className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          로그인 페이지로 돌아가기
        </a>
      </div>
    </div>
  )
}
