import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"


const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname.substring(1)

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        let itemSubPaths = items[i].pathname.split('/')
        if (pathName === itemSubPaths[itemSubPaths.length - 1]) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Main</li>
            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ti-home"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/properties" className="waves-effect">
                <i className="ti-bag"></i>
                <span>Properties</span>
              </Link>
            </li>

            <li>
              <Link to="/tenants" className="waves-effect">
                <i className="ti-user"></i>
                <span>Tenants</span>
              </Link>
            </li>

            {/* <li>
              <Link to="/landlords" className="waves-effect">
                <i className="ti-wallet"></i>
                <span>{props.t("Landlords")}</span>
              </Link>
            </li> */}

            

            {/* <li>
              <Link to="/units" className="waves-effect">
                <i className="ti-agenda"></i>
                <span>{props.t("Units")}</span>
              </Link>
            </li> */}

            <li>
              <Link to="/summary" className="waves-effect">
                <i className="ti-bookmark-alt"></i>
                <span>Summary</span>
              </Link>
            </li>
              {/* <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/summary">Summary</Link>
                </li>
                <li>
                  <Link to="/transactions">Transactions </Link>
                </li>
                <li>
                  <Link to="/settlements">Settlements </Link>
                </li>
              </ul>
            </li> */}

            {/* <li>
              <Link to="/requests" className="waves-effect">
                <i className="ti-notepad"></i>
                <span>{props.t("Requests")}</span>
              </Link>
            </li> */}

            {/* <li>
              <Link to="/staffs" className="waves-effect">
                <i className="ti-layers"></i>
                <span>Users</span>
              </Link>
            </li> */}

            {/* <li>
              <Link to="/support" className="waves-effect">
                <i className="ti-face-smile"></i>
                <span>{props.t("Support")}</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(SidebarContent)
