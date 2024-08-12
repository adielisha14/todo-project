import { Skeleton } from "@/components/ui/skeleton"
import {Card} from "@/components/ui/card"
 
export function SkeletonCard() {

  return (
    <>
     <Card className='w-[350px] h-[250px] '> 
    <div className="flex flex-col space-y-3">
      <Skeleton className="m-5 h-[50px] w-[250px] rounded-xl" />
      <div className="m-5 space-y-2">
        <Skeleton className="h-3 w-[250px]" />
        <Skeleton className="h-3 w-[200px]" />
        <Skeleton className="h-3 w-[200px]" />
        <Skeleton className="h-3 w-[200px]" />
        <Skeleton className="h-3 w-[200px]" />
      </div>
    </div>
    </Card>

 </> )
}