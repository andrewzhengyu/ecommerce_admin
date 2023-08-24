'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import axios from 'axios'

import { useStoreModal } from "@/hooks/useStoreModal"
import { Modal } from "../ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'

const formSchema = z.object({
    name: z.string().min(1),
});

const StoreModal = () => {

  const storeModal = useStoreModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
        name:''
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
        setIsLoading(true);

        const response = await axios.post('/api/stores', value);
        
        window.location.assign(`/${response.data.id}`);
    } catch (error) {
        toast.error('Something went wrong');
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Modal
        title="Create Store"
        description="add a new store"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        <div>
            <div className='space-y-4 py-2 pb-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                        disabled={isLoading}
                                        placeholder='E-commerce' 
                                        {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className='pt-6 space-x-2 flex items-center justify-end'>
                                <Button disabled={isLoading} variant={'outline'} onClick={storeModal.onClose}>Cancel</Button>
                                <Button disabled={isLoading} type='submit'>Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
  )
}

export default StoreModal