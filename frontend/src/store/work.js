import {create} from 'zustand'

export const useWorkStore = create(set => ({
  works: [],
  setWorks: works => set({ works }),
  createWork: async newWork => {
    if (!newWork.title || !newWork.descript || !newWork.thumb) {
      return { success: false, message: 'Please fill in all fields' };
    }
    
    const res = await fetch('/api/works', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        //'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify(newWork)
    })
    const data = await res.json();

    set(state => ({ works: [...state.works, data.data] }));

    return { success: true, message: 'Works created successfully' };
  },
  
  fetchWorks: async () => {
    const res = await fetch('/api/works');
    const data = await res.json();
    
    set({ works: data.data });
  },
  
  updateWork: async (wid, updateWork) => {
    const res = await fetch(`/api/works/${wid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateWork)
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    
    set(state => ({
      works: state.works.map(work => work._id === wid ? data.data : work)
    }));
    return { success: true, message: data.message };

  },
  
  deleteWork: async (wid) => {
    const res = await fetch(`/api/works/${wid}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set(state => ({
      works: state.works.filter(work => work._id !== wid)
    }));
    
    return { success: true, message: data.message };
  }
  

}))

