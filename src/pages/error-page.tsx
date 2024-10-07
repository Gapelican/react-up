import React from 'react'
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'

const ErrorPage: React.FC = () => {
  const error = useRouteError()
  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = 'Unknown error'
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Oops!</h1>
      <p>Sorry, ocorreu um erro inesperado.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </div>
  )
}

export default ErrorPage
