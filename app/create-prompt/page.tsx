'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@/components/Form';


const CreatePrompt = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={isSubmitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt;