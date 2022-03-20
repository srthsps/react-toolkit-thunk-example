import React from "react"
import ContentLoader from "react-content-loader"

const Skelton = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={400}
    viewBox="0 0 600 180"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />  */}
    {/* <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />  */}
    <rect x="0" y="12" rx="3" ry="3" width="580" height="6" /> 
    <rect x="0" y="42" rx="3" ry="3" width="580" height="6" /> 
    <rect x="0" y="72" rx="3" ry="3" width="580" height="6" />
    <rect x="0" y="102" rx="3" ry="3" width="580" height="6" /> 
    <rect x="0" y="132" rx="3" ry="3" width="580" height="6" /> 
    <rect x="0" y="162" rx="3" ry="3" width="580" height="6" /> 
    <rect x="0" y="192" rx="3" ry="3" width="580" height="6" /> \
    {/* <circle cx="20" cy="20" r="20" /> */}
  </ContentLoader>
)

export default Skelton