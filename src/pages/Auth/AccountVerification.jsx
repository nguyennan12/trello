
import { useState, useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '~/apis'

function AccountVerification() {
  let [searchParams] = useSearchParams()
  // const email = searchParams.get('email')
  // const token = searchParams.get('token')
  const { email, token } = Object.fromEntries([...searchParams])

  //tao bien state de biet verify tai khoan chua
  const [verified, setVerified] = useState(false)

  //goi API de verify tai khoan
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to="/404" replace="true" />
  }

  if (!verified) {
    return <PageLoadingSpinner />
  }

  return (
    <Navigate to={`/login?verifiedEmail=${email}`} />
  )
}

export default AccountVerification