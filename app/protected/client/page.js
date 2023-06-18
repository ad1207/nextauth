'use client'

import { useSession,getProviders } from 'next-auth/react'
import { redirect } from 'next/navigation'

const ClientProtectPage = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin?callbackUrl=/protected/client')
    }
  })
  const providers = getProviders()

  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-2xl font-bold'>
          This is a <span className='text-emerald-500'>client-side</span>{' '}
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

export default ClientProtectPage