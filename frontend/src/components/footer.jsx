import React from 'react'

const Footer = ({completedTaskCount , activeTaskCount}) => {
  return (
    <>
        {
            completedTaskCount + activeTaskCount > 0 && (
                <div className='text-center'>
                    <p className='text-sm text-muted-foreground'>
                          {
                            completedTaskCount > 0 && (
                                <>
                                      good job! You have completed {completedTaskCount} task
                                      {completedTaskCount > 0 && `,still unfinished ${activeTaskCount} task`}.
                                </>
                            )
                          }
                            {
                                completedTaskCount === 0 && (
                                    <>
                                        You have {activeTaskCount} unfinished task
                                        {activeTaskCount > 1 && 's'}. Keep going!
                                    </>
                                )
                            }
                    </p>
                </div>
                )
        }
    </>
  )
}

export default Footer
