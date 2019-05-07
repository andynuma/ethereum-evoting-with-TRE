import React from "react"

const AddressViewer = ({address,contract, role}) => {
  return(
    <div>
      {role} Address : {address}
    </div>
  )
}

export default AddressViewer;