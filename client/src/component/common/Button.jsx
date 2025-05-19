import React from 'react'
import { Button } from '../ui/button'

function AnimatedButton({text,handleOnClick}) {
    return (
        <Button
            className="w-[180px] mt-4"
            onClick={handleOnClick}
            
        >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_60deg_at_50%_50%,#6A27FF_0%,#27E5FF_50%,#6A27FF_80%)]"></span>
            <span className="inline-flex h-full w-[180px] cursor-pointer items-center justify-center rounded-full bg-background px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                {text}
            </span>
        </Button>
    )
}

export default AnimatedButton