import Image from "next/image";

export const ChatElement = ({ oUser, chat, user }) => {

    const date = Math.abs(chat.lastActivity.toDate() - Date.now());
    let diff;

    if (date > 8.64e+7) {
        diff = ~~(date / 8.64e+7) + "days";
    }
    else if (date > 3.6e+6) {
        diff = ~~(date / 3.6e+6) + "hours";
    }
    else if (date > 60000) {
        diff = ~~(date / 60000) + "minutes";
    }
    else {
        diff = ~~(date / 1000) + "seconds";
    }

    return (
        <li className="flex bg-base-100 px-8">
            <div className="w-14 h-14 relative overflow-hidden rounded-full mr-8 ">
                <Image
                    src={oUser.picture}
                    alt="User Image"
                    layout='fill'
                />
            </div>
            <div>   
                {oUser.name}
                {chat.lastContent.message && (
                    <>
                        {user == chat.lastContent.sender && "You: "}{chat.lastContent.message}
                        {diff} ago
                    </>
                )}
            </div>
        </li>
    )
}