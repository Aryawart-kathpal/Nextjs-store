'use client'
import { Input } from "../ui/input"
import { useSearchParams,useRouter } from "next/navigation"
import {useDebouncedCallback} from 'use-debounce';
import { useState,useEffect } from "react";
// debouncer is used as we don't want to make api call as soon as we enter something, so we add some debounce time while typing to send the search call to the api
// more for 'use client in chatGPT conversation'

function NavSearch() {

  const searchParams = useSearchParams();// as in the server component we directly have access to searchParams object, here we use next hook
  const {replace} = useRouter();
  const [search,setSearch] = useState(searchParams.get('search')?.toString()||'')

  const handleSearch = useDebouncedCallback((value:string)=>{
    const params = new URLSearchParams(searchParams);
    if(value){
      params.set('search',value);
    }
    else{
      params.delete('search');
    }
    replace(`/products?${params.toString()}`);
  },500)

  // useEffect(()=>{
  //   if(!searchParams.get('search')){
  //     setSearch('');
  //   }
  // },[searchParams.get('search')]);

  return (
    <Input type="search" placeholder="search product..." className="max-w-xs dark:bg-muted"
    onChange={(e)=>{
      setSearch(e.target.value);
      handleSearch(e.target.value)
    }} value={search}
    />
  )
}
export default NavSearch