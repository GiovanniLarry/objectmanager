'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { socketService } from '@/lib/socket';
import { objectsApi, Object } from '@/lib/api';

export default function ObjectDetail() {
  const params = useParams();
  const router = useRouter();
  const [object, setObject] = useState<Object | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchObject = async () => {
      try {
        const response = await objectsApi.getById(params.id as string);
        setObject(response.data);
      } catch (error) {
        console.error('Failed to fetch object:', error);
        setError('Object not found');
      } finally {
        setLoading(false);
      }
    };

    fetchObject();

    socketService.connect();
    
    const handleDeleteObject = (data: { id: string }) => {
      if (data.id === params.id) {
        router.push('/');
      }
    };

    socketService.onDeleteObject(handleDeleteObject);

    return () => {
      socketService.offDeleteObject(handleDeleteObject);
      socketService.disconnect();
    };
  }, [params.id, router]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this object?')) {
      return;
    }

    setDeleting(true);
    try {
      await objectsApi.delete(params.id as string);
      router.push('/');
    } catch (error) {
      console.error('Failed to delete object:', error);
      setError('Failed to delete object');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !object) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Object not found'}</p>
          <Link href="/">
            <Button>Back to Objects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-light">
              ← Back to Objects
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-square relative bg-gray-50">
              <Image
                src={object.imageUrl}
                alt={object.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-light text-gray-900 mb-4">{object.title}</h1>
                <div className="flex items-center text-gray-500 text-sm font-light">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(object.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{object.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button
                  onClick={handleDelete}
                  disabled={deleting}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
                >
                  {deleting ? 'Deleting...' : 'Delete Object'}
                </Button>
                <Link href="/create">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200">
                    Create New Object
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
