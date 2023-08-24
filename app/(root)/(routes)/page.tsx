'use client'

import Image from 'next/image'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/useStoreModal'

const SetUpPage = () => {

  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() =>{
    if(!isOpen) onOpen();
  },[isOpen, onOpen]);
  
  return null;
}

export default SetUpPage;