import React from 'react'

function Home() {
    const userType=localStorage.getItem('userType')
  return (
    <div className='flex flex-grow '>
        <div className='w-1/4 border-r-2 bg-gray-300 p-3'> 
            <p className='text-center text-lg'>
                Upcoming Deadlines
            </p>
            <br></br><br></br>
            <p className='italic'>
                *This section is under development
            </p>
        </div>
        <div className='w-2/4 p-3'>
            Greetings,

            {userType=='admin'?(
                <>
                    <p>
                        Follow the Teams Section to perform operations on teams
                    </p>

                    <p>
                        Report section to create reports for teams
                    </p>
                </>
            ): null}
        </div>
        <div className='w-1/4 bg-gray-300 p-3 border-black border-l-2'>
            <div>

            </div>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default Home