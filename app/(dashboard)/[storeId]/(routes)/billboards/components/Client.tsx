'use client'

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BillboardColumn, columns } from "./Columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/DataTable"
import ApiList from "@/components/ui/ApiList"

interface BillboardsClientProps{
  data: BillboardColumn[]
}

export const BillboardsClient = ({data}:BillboardsClientProps) => {

  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards(${data.length})`}
          description="Manage billboards for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className=" mr-2 h-4 w-4"/>
          Add New
        </Button>
      </div>
      <Separator/>
      <DataTable searchKey="label" columns={columns} data={data}/>
      <Heading title="API" description="API calls for Billboards"/>
      <Separator/>
      <ApiList entityName="billboards" entityIdName="billboardId"/>
    </>
  )
}

