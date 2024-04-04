import dashboardIcon from '../assets/dashboardIcon.svg'
import tasksIcon from '../assets/tasksIcon.svg'
import messagesIcon from '../assets/messagesIcon.svg'
import usersIcon from '../assets/usersIcon.svg'

const SideBarLink = ({ name, img }) => {
    return (
        <div className='flex gap-5 py-[0.60rem] px-4 hover:bg-[#EBF1FD] rounded-lg cursor-pointer'>
            <img src={img} alt={`${img}`} />
            <p className='text-[1rem]'>{name}</p>
        </div>
    )
}

export const SideBar = () => {
    return (
        <aside className="w-[20rem] h-screen p-6">
            <div className="flex items-center gap-4 border-b-[1px] border-[#e9e8e8] pb-3">
                <img src="/logoTemporalBlack.svg" alt="Logo" className="w-[2.5rem]" />
                <p className="font-[600] text-[1.3rem]">Leading</p>
            </div>
            <div className='mt-7 space-y-[0.40rem] text-[#222936] font-[400] font-inter pb-10 border-b-[1px] border-[#e9e8e8]'>
                <SideBarLink name={"Dashboard"} img={dashboardIcon} />
                <SideBarLink name={"Tareas"} img={tasksIcon} />
                <SideBarLink name={"Mensajes"} img={messagesIcon} />
                <SideBarLink name={"Usuarios"} img={usersIcon} />
            </div>
            <div>
                <div>
                    <div>
                        <img src="" alt="" />
                        <img src="" alt="" />
                        <p></p>
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <img src="" alt="" />
                </div>
                <img src="" alt="" />
            </div>
            <div>
                <div>
                    <img src="" alt="" />
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                    <img src="" alt="" />
                </div>
            </div>
        </aside>
    )
}