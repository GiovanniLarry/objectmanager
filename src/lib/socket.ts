import { io, Socket } from 'socket.io-client';
import { Object } from './api';

export class SocketService {
  private socket: Socket | null = null;

  connect() {
    const serverUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    this.socket = io(serverUrl);
    
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onNewObject(callback: (object: Object) => void) {
    if (this.socket) {
      this.socket.on('new_object', callback);
    }
  }

  onDeleteObject(callback: (data: { id: string }) => void) {
    if (this.socket) {
      this.socket.on('delete_object', callback);
    }
  }

  offNewObject(callback: (object: Object) => void) {
    if (this.socket) {
      this.socket.off('new_object', callback);
    }
  }

  offDeleteObject(callback: (data: { id: string }) => void) {
    if (this.socket) {
      this.socket.off('delete_object', callback);
    }
  }
}

export const socketService = new SocketService();
