import { create } from 'zustand';

export const useServiceStore = create(set => ({
  services: [],
  setServices: services => set({ services }),
  createService: async newService => {
    if (!newService.title || !newService.descript || !newService.iconimg) {
      return { success: false, message: 'Please fill in al fields' }
    }
    
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newService)
    })
    const data = await res.json()
    
    set(state => ({ services: [...state.services, data.data] }))

    return { success: true, message: 'Services created successfully' }
  },
  
  fetchServices: async () => {
    const res = await fetch('/api/services');
    const data = await res.json();
    
    set({ services: data.data })
  },
  
  updateService: async (sid, updateService) => {
    const res = await fetch(`/api/services/${sid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateService)
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    
    set(state => ({
      services: state.services.map(service => service._id === sid ? data.data : service)
    }));
    return { success: true, message: data.message };
  },
  
  deleteService: async (sid) => {
    const res = await fetch(`/api/services/${sid}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    
    if (!data.success) return { success: false, message: data.message }
    
    set(state => ({
      services: state.services.filter(service => service._id !== sid)
    }));
    
    return { success: true, message: data.message };
  }

}));

