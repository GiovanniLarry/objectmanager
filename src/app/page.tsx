'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { socketService } from '@/lib/socket';
import { objectsApi, Object } from '@/lib/api';

export default function Home() {
  const [objects, setObjects] = useState<Object[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await objectsApi.getAll();
        setObjects(response.data);
      } catch (error) {
        console.error('Failed to fetch objects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();

    const socket = socketService.connect();
    
    const handleNewObject = (newObject: Object) => {
      setObjects(prev => [newObject, ...prev]);
    };

    const handleDeleteObject = (data: { id: string }) => {
      setObjects(prev => prev.filter(obj => obj._id !== data.id));
    };

    socketService.onNewObject(handleNewObject);
    socketService.onDeleteObject(handleDeleteObject);

    return () => {
      socketService.offNewObject(handleNewObject);
      socketService.offDeleteObject(handleDeleteObject);
      socketService.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="mb-16">
          <h1 className="text-3xl font-light text-gray-900 tracking-tight">
            Heyama Objects Manager
          </h1>
        </div>

        {objects.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-8">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-3">No objects found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto font-light">Create your first object.</p>
            <Link href="/create">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                Create First Object
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {objects.map((object) => (
              <Card key={object._id} className="overflow-hidden border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                <div className="aspect-square relative bg-gray-50">
                  <Image
                    src={object.imageUrl}
                    alt={object.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">{object.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 font-light">
                    {new Date(object.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-600 mb-6 line-clamp-2 text-sm font-light leading-relaxed">{object.description}</p>
                  <Link href={`/object/${object._id}`}>
                    <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 font-medium">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
