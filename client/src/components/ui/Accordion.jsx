import { Input } from "./Input"

export default function Accordion() {
  return (
    <div className="max-w-2xl mx-auto my-10 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">¿Cómo podemos ayudarte?</h1>
      <div className="flex items-center rounded-md border-2 border-gray-200 mb-6">
        <MicroscopeIcon className="text-gray-400 w-6 h-6 ml-4" />
        <Input className="pl-2 py-3 w-full border-none" placeholder="Article name or keywords.." type="text" />
      </div>
      <div className="space-y-4">
        <details className="border-t border-gray-200 pt-4">
          <summary className="flex justify-between items-center">
            <span>Do I need to register with 6Degree to place orders?</span>
            <PlusIcon className="text-gray-400 w-6 h-6 cursor-pointer"/>
          </summary>
          <p className="mt-2">
            Registering with 6Degree is not mandatory but we recommend you do so to enjoy the benefits of being a
            registered user.
          </p>
        </details>
        <details className="border-t border-gray-200 pt-4">
          <summary className="flex justify-between items-center">
            <span>How do I Register?</span>
            <PlusIcon className="text-gray-400 w-6 h-6 cursor-pointer"/>
          </summary>
          <p className="mt-2">
            Register simply by setting up an email address and a password. Sign in to view what is already in your
            shopping cart. You can also opt to sign in using Facebook, Google or Instagram.
          </p>
        </details>
        <details className="border-t border-gray-200 pt-4">
          <summary className="flex justify-between items-center">
            <span>I have forgotten my password. How do I change it?</span>
            <PlusIcon className="text-gray-400 w-6 h-6 cursor-pointer"/>
          </summary>
          <p className="mt-2">
            You can reset your password by clicking on the 'Forgot Password' link on the login page. You will receive an
            email with instructions on how to reset your password.
          </p>
        </details>
        <details className="border-t border-gray-200 pt-4">
          <summary className="flex justify-between items-center">
            <span>How can I change my personal details or shipping address?</span>
            <PlusIcon className="text-gray-400 w-6 h-6 cursor-pointer"/>
          </summary>
          <p className="mt-2">
            You can change your personal details or shipping address by logging into your account and navigating to the
            'My Profile' section. Here you can update your information and save the changes.
          </p>
        </details>
        <details className="border-t border-gray-200 pt-4">
          <summary className="flex justify-between items-center">
            <span>How do I select my size?</span>
            <PlusIcon className="text-gray-400 w-6 h-6 cursor-pointer"/>
          </summary>
          <p className="mt-2">
            You can select your size by clicking on the 'Size Chart' link available on the product page. This will
            display the size options available for the product you wish to purchase.
          </p>
        </details>
        <details className="border-t border-gray-200 pt-4">
          <summary className="flex justify-between items-center">
            <span>Does 6Degree provide alterations?</span>
            <PlusIcon className="text-gray-400 w-6 h-6 cursor-pointer"/>
          </summary>
          <p className="mt-2">
            Yes, 6Degree provides alteration services for the products purchased on our platform. You can request
            alterations while placing the order or contact our customer support team for assistance.
          </p>
        </details>
        <details className="border-t border-b border-gray-200 pt-4 pb-6">
          <summary className="flex justify-between items-center">
            <span>I need help to decide what to buy, can I speak to a stylist?</span>
            <PlusIcon className="text-gray-400 w-6 h-6 cursor-pointer"/>
          </summary>
          <p className="mt-2">
            Yes, you can speak to a stylist to get personalized recommendations. Simply click on the 'Chat with a
            Stylist' button available on the product page to start a conversation with our fashion experts.
          </p>
        </details>
      </div>
    </div>
  )
}

function MicroscopeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
