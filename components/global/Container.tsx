import { cn } from "@/lib/utils"

// cn removes the falsy(null,undefined,false) values in the input
function Container({children,className}:{children:React.ReactNode,className?:string}) {
  return (
    <div className={cn('mx-auto max-w-6xl xl:max-w-7xl px-8',className)}>
        {children}
    </div>
  )
}
export default Container