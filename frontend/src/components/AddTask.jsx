import React from 'react'
import Card from './ui/card'
import Input from './ui/input'
function AddTask() {
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
        <div className="flex flex-col gap-3 sm:flex-row">
            <Input/>
        </div>
    </Card>
  )
}

export default AddTask
