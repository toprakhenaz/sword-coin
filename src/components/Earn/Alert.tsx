import { AlertProps } from "@/types";


export function Alert({ children , isGreen } : AlertProps) {
  return(
  <div className= {`${ isGreen ? "bg-green-500" : "bg-red-500"} text-white p-4 rounded mb-4`}>
    {children}
  </div>
)
}

export function AlertTitle({ children } : {children: React.ReactNode })  {
  return <h3 className="font-bold">{children}</h3>
}
  

export function AlertDescription ({ children } : { children: React.ReactNode } ) {
   return <p>{children}</p>
}
