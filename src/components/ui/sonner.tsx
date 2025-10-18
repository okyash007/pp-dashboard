import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-right"
      expand={true}
      richColors={true}
      closeButton={false}
      visibleToasts={5}
      icons={{
        success: <CircleCheckIcon className="size-5 text-green-600" />,
        info: <InfoIcon className="size-5 text-blue-600" />,
        warning: <TriangleAlertIcon className="size-5 text-yellow-600" />,
        error: <OctagonXIcon className="size-5 text-red-600" />,
        loading: <Loader2Icon className="size-5 animate-spin text-blue-600" />,
      }}
      toastOptions={{
        style: {
          background: 'white',
          color: 'black',
          border: '2px solid black',
          borderRadius: '16px',
          boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.6), 0px 0px 0px 1px rgba(0,0,0,0.1)',
          padding: '16px 20px',
          fontSize: '14px',
          fontWeight: '500',
          maxWidth: '400px',
          minWidth: '300px',
        },
        className: 'toast-item',
        descriptionStyle: {
          color: '#6b7280',
          fontSize: '13px',
          marginTop: '4px',
          lineHeight: '1.4',
        },
        titleStyle: {
          fontWeight: '600',
          fontSize: '15px',
          marginBottom: '2px',
        },
        actionButtonStyle: {
          background: 'transparent',
          color: 'black',
          border: '2px solid black',
          borderRadius: '8px',
          padding: '4px 8px',
          fontSize: '12px',
          fontWeight: '600',
          boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.6)',
          transition: 'all 0.15s ease',
        },
        cancelButtonStyle: {
          background: 'transparent',
          color: 'black',
          border: '2px solid black',
          borderRadius: '8px',
          padding: '4px 8px',
          fontSize: '12px',
          fontWeight: '600',
          boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.6)',
          transition: 'all 0.15s ease',
        },
        closeButtonStyle: {
          background: 'transparent',
          color: 'black',
          border: '3px solid black',
          borderRadius: '0px',
          padding: '6px',
          fontSize: '12px',
          fontWeight: '600',
          boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.6)',
          transition: 'all 0.15s ease',
          minWidth: '24px',
          minHeight: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
