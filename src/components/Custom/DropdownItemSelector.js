import React, { useState } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

const DropdownItemSelector = ({ data, selectedIndex, onItemSelected, defaultItem }) => {
  let sanitizedIndex = (selectedIndex >= data.length || selectedIndex < 0) ? -1 : selectedIndex;

  const [isOpen, setIsOpen] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(sanitizedIndex);
  const toggle = () => setIsOpen(prevState => !prevState)

  function itemSelected(index) {
    setSelectedItemIndex(index);
    if (onItemSelected) {
      onItemSelected(index);
    }
  }

  return (
    <div>
      <Dropdown isOpen={isOpen} toggle={toggle}>
        <DropdownToggle>
          {selectedItemIndex == -1 ? ((defaultItem) ? defaultItem : "All") : data[selectedItemIndex].name}
          <i className="ps-1 mdi mdi-chevron-down" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            value={-1}
            onClick={e => itemSelected(parseInt(e.target.value))}
            active={selectedItemIndex == -1} >
            {defaultItem ? defaultItem : "All"}
          </DropdownItem>
          {data.map((item, index) => (
            <DropdownItem
              value={item.id}
              key={item.id}
              onClick={e => itemSelected(index)}
              active={selectedItemIndex == index}>
              {item.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

DropdownItemSelector.propTypes = {
  data: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  onItemSelected: PropTypes.func,
  defaultItem: PropTypes.string,
}

DropdownItemSelector.defaultProps = {
  selectedIndex: -1
}

export default DropdownItemSelector
