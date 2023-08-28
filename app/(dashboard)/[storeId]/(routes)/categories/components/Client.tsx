'use client'

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./Columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/DataTable"
import ApiList from "@/components/ui/ApiList"

interface CategoryClientProps{
  data: CategoryColumn[]
}

export const CategoryClient = ({data}:CategoryClientProps) => {

  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className=" mr-2 h-4 w-4"/>
          Add New
        </Button>
      </div>
      <Separator/>
      <DataTable searchKey="name" columns={columns} data={data}/>
      <Heading title="API" description="API calls for Categories"/>
      <Separator/>
      <ApiList entityName="categories" entityIdName="categoryId"/>
    </>
  )
}

