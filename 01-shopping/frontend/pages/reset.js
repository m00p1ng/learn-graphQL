import Reset from '../components/Reset'

function ResetPage({ query }) {
  return (
    <div>
      <p>Reset Your Password {query.resetToken}</p>
      <Reset resetToken={query.resetToken} />
    </div>
  )
}

export default ResetPage