import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { getProviders } from 'next-auth/react'

const ServerProtectedPage = async () => {
  const session = await getServerSession(authOptions)
  const providers = await getProviders()

  if (!session) {
    redirect('/signin?callbackUrl=/protected/server')
  }

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-2xl font-bold'>
          This is a <span className='text-emerald-500'>server-side</span>{' '}
          protected page
        </h1>
        <h2 className='mt-4 font-medium'>Session:</h2>
        <p className='mt-4'>{JSON.stringify(session)}</p>
        <h2 className='mt-4 font-medium'>Provider:</h2>
        <p className='mt-4'>{JSON.stringify(providers)}</p>
      </div>
    </section>
  )
}

export default ServerProtectedPage