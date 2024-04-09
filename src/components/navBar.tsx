'use client'

import { Button } from "./ui/button";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';
import './wallet.css'
import { useRouter} from "next/navigation";
import { depositToVault} from "@/lib/useAction";
import { useWorkspace } from "@/contexts/WorkspaceProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGameState } from "@/contexts/GameStateProvider";

const buttonStyles = "rounded-xl italic border-dashed border-[5px] border-black hover:bg-[#f7d726] "

function PlayerDialog() {
  const {playerInfo} = useGameState()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`h-auto p-0 ${buttonStyles} transition ease-in-out hover:-translate-y-1 hover:scale-110`}>
          <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"></path></svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-secondary justify-center flex flex-col items-center border-yellow-300 border-[4px]">
        <DialogHeader>
          <DialogTitle className="font-sans text-white">
            Your Info
          </DialogTitle>
          <Avatar className="bg-primary h-[100px] w-[100px] rounded-full border-[5px] border-yellow-400">
            <AvatarImage src={playerInfo?.avatar ?? ""} alt="avatar"/>
            <AvatarFallback>-</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="inline-flex justify-between">
              <span className="text-white">Balance</span>
              <span className="text-white">{playerInfo?.balance ?? "?"}</span>
            </div>
            <div className="inline-flex justify-between">
              <span className="text-white">Games</span>
              <span className="text-white">{playerInfo?.games ?? ""}</span>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}


export default function NavBar() {
  const router = useRouter();
  const {initPlayer, provider, program} = useWorkspace()
  const mutateDeposit = useMutation({
    mutationFn: ({ amount }: { amount: number }) =>
      depositToVault({ provider, program, amount }),
  });

  const mutateInitPlayer = useMutation({mutationFn: initPlayer})
  
  return (
    <div className="absolute top-0 w-full h-80px flex items-center justify-between px-5 py-3">
      <button  className="transition ease-in-out hover:-translate-y-1 hover:scale-110 pointer-events-auto">
        <div className="flex items-center justify-center">
          <img src="/pixelana.png" alt="logo" className="h-[70px] w-[93px]" />
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={70} height={70}><defs><filter id="shadow-1" height="300%" width="300%" x="-100%" y="-100%"><feFlood flood-color="rgba(236, 118, 76, 1)" result="flood"/><feComposite in="flood" in2="SourceGraphic" operator="atop" result="composite"/><feGaussianBlur in="composite" stdDeviation="15" result="blur"/><feOffset dx="0" dy="0" result="offset"/><feComposite in="SourceGraphic" in2="offset" operator="over"/></filter></defs><g transform="translate(0,0)" ><path d="M320.9 19.054c-39.32 0-71 31.68-71 71s31.68 71 71 71 71-31.68 71-71-31.68-71-71-71zm0 30c22.537 0 41 18.463 41 41s-18.463 41-41 41-41-18.463-41-41 18.463-41 41-41zM146.5 64.42a37.825 37.825 0 0 0-8.3.83c-29.027 6.162-49.944 25.765-62.878 51.578-12.934 25.812-18.633 57.932-19.178 91.888-1.09 67.913 18.283 143.263 49.238 190.287 10.45 15.873 24.974 24.52 41.96 28.866 6.516 1.665 13.427 2.814 20.827 3.713a57.1 57.1 0 0 1-.27-5.53c0-4.142.572-8.306 1.642-12.485-6.597-.813-12.504-1.8-17.738-3.14-14.19-3.63-23.288-9.02-31.387-21.323-27.905-42.392-47.307-115.925-46.277-180.1.515-32.087 6.1-61.815 17.275-84.115 11.175-22.3 27.19-37.078 50.522-42.03 6.646-1.412 10.758-.17 15.23 3.33 4.473 3.503 8.925 9.938 12.633 18.57 6.386 14.87 10.5 35.725 13.035 56.294h18.133c-2.558-22.05-6.74-45.028-14.63-63.396-4.43-10.315-10.045-19.352-18.073-25.64-6.02-4.714-13.61-7.504-21.764-7.6zm174.4 2.634c-12.81 0-23 10.19-23 23s10.19 23 23 23 23-10.19 23-23-10.19-23-23-23zm-23 108.977v137.75c.14 3.726 1.945 6.4 6.222 9.108 4.293 2.717 10.887 4.59 17.405 4.78 6.517.19 12.843-1.326 16.732-3.762 3.888-2.436 5.64-4.806 5.64-9.852V176.03a88.702 88.702 0 0 1-23 3.024c-7.95 0-15.66-1.055-23-3.023zm-127.315 3.024c1.274 18.84 3.492 61.976-.802 88.442-2.047 12.612-7.35 26.95-11.577 37.558h69.385c-4.224-10.61-9.528-24.946-11.575-37.558-4.295-26.466-2.076-69.603-.803-88.442h-44.627zm63.315 16v30h46v-30h-46zm-89 126v18h96v-18h-96zm138.736 5.96c-27.298 14.694-51.16 32.19-68.373 49.403-19.15 19.152-29.363 38.137-29.363 49.637 0 13.182 5.877 23.69 16.293 33.068 10.415 9.378 25.387 17.005 41.552 22.393 45.724 15.24 108.584 15.24 154.307 0 16.166-5.388 31.137-13.015 41.553-22.393 10.416-9.377 16.295-19.886 16.295-33.068 0-21-10.155-38.33-29.022-55.31-16.857-15.172-40.628-29.394-68.123-43.57a30.515 30.515 0 0 1-10.94 11.988c-.07.042-.14.08-.208.123 17.422 2.965 33.142 8.79 45.972 16.875 19.12 12.05 32.32 29.83 32.32 50.394 0 20.566-13.2 38.345-32.32 50.395-19.12 12.048-44.638 19.104-72.68 19.104-28.043 0-53.562-7.056-72.682-19.105-19.12-12.05-32.318-29.83-32.318-50.396 0-20.565 13.2-38.345 32.318-50.394 13.266-8.36 29.617-14.31 47.75-17.174a42.995 42.995 0 0 1-1.47-.89c-4.3-2.72-8.18-6.5-10.862-11.08zm37.264 28.04c-24.977 0-47.46 6.487-63.084 16.334-15.626 9.848-23.916 22.32-23.916 35.166 0 12.848 8.29 25.32 23.916 35.166 15.625 9.848 38.107 16.334 63.084 16.334 15.375 0 29.797-2.465 42.263-6.652-4.685-3.872-9.765-8.13-14.255-12.965-3.65-3.93-6.973-8.283-9.022-13.594-2.05-5.31-2.506-11.822-.262-17.904l16.887 6.23c-.707 1.917-.64 3.096.17 5.195.81 2.098 2.68 4.874 5.42 7.824 5.012 5.398 12.588 11.12 19.345 17.054.86-.5 1.714-1.005 2.537-1.524 15.625-9.847 23.918-22.318 23.918-35.166 0-12.847-8.293-25.318-23.918-35.166-15.626-9.847-38.105-16.334-63.082-16.334zm-8.584 11.076h16v18h-16v-18zm38.006 5.383h16v18h-16v-18zm-72.506 3.137h16v18h-16v-18zm-27.98 26.404h16v18h-16v-18zm125.876 0h16v18h-16v-18zm-97.943 19.512h16v18h-16v-18zm34.782 8.762h16v18h-16v-18z" fill="#f5ec24" fill-opacity="1" stroke="#6d6d1d" stroke-opacity="1" stroke-width="11" filter="url(#shadow-1)"/></g></svg> */}
        <span className="font-sans text-[25px] text-[#19fb9b] text-shadow-custom">PixeLana</span>
        </div>
      </button>
      <div className="inline-flex items-center justify-center gap-5">
        <PlayerDialog />
        <Button disabled={mutateDeposit.status === "pending"} onClick={() => mutateDeposit.mutateAsync({amount: 1})} className={`h-auto p-0 ${buttonStyles} transition ease-in-out hover:-translate-y-1 hover:scale-110`}>
          <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 256 256"><path fill="currentColor" d="M216 36H40a20 20 0 0 0-20 20v136a20 20 0 0 0 20 20h12v12a12 12 0 0 0 24 0v-12h104v12a12 12 0 0 0 24 0v-12h12a20 20 0 0 0 20-20V56a20 20 0 0 0-20-20M44 188V60h168v56h-21.68a44 44 0 1 0 0 24H212v48Zm124-60a20 20 0 1 1-20-20a20 20 0 0 1 20 20"></path></svg>
        </Button>
      <WalletMultiButton className="wallet-button mr-6 font-sans">
      </WalletMultiButton>
        <Button className={`h-auto p-0 ${buttonStyles} transition ease-in-out hover:-translate-y-1 hover:scale-110`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={40} height={40}><path d="M0 0h512v512H0z" fill="#ffffff" fill-opacity="0"/><g className="" transform="translate(0,0)" ><path d="M234.875 18.78c-26.087 2.367-51.557 8.56-74.875 18.782 15.37 32.763 14.222 66.706-6.72 82.407-20.835 15.617-54.055 7.965-81.124-15.69-16.246 19.452-29.336 41.36-38.875 65.626 33.83 12.333 56.635 37.665 52.94 63.5-3.698 25.835-32.697 43.74-68.626 46.094 2.338 25.796 8.91 50.778 18.937 73.875 17.81-8.182 35.793-11.09 51.095-8.938 13.032 1.87 23.927 7.015 31.156 16.657 15.817 21.097 7.603 54.713-16.78 81.97 19.516 16.35 42.216 29.444 66.594 39.03 12.33-33.828 37.655-56.634 63.5-52.938 25.844 3.697 43.74 32.696 46.094 68.625 26.087-2.365 51.557-8.555 74.875-18.78-15.766-32.997-14.26-67.588 6.843-83.406 9.64-7.23 22.568-9.022 35.594-7.125 15.112 2.16 31.19 10.25 45.563 22.78 16.088-19.345 29.4-41.51 38.875-65.594-33.83-12.332-56.635-37.653-52.938-63.5 3.697-25.846 32.665-43.772 68.594-46.125-2.36-25.944-8.774-50.663-18.906-73.874-32.612 15.117-66.66 13.145-82.282-7.687-15.696-20.944-7.252-53.86 16.688-81-19.52-16.352-42.248-29.447-66.625-39.032-12.332 33.828-37.657 56.66-63.5 52.968-25.846-3.693-43.744-32.696-46.095-68.625zm21.656 95.126c79.626 0 144.376 64.752 144.376 144.375 0 79.626-64.75 144.376-144.375 144.376-79.624 0-144.374-64.75-144.374-144.375 0-79.624 64.75-144.374 144.375-144.374zm0 18.688c-69.524 0-125.686 56.162-125.686 125.687 0 69.526 56.162 125.69 125.687 125.69 69.526 0 125.69-56.164 125.69-125.69 0-69.522-56.164-125.686-125.69-125.686zm.033 15.125c61.094 0 110.625 49.53 110.625 110.624 0 61.095-49.53 110.625-110.625 110.625s-110.625-49.53-110.625-110.626c0-61.095 49.53-110.625 110.625-110.625z" fill="#000000" fill-opacity="1"/></g></svg>
        </Button>
      </div>
    </div>
  );
}
