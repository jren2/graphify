import { Row, Dropdown } from 'react-bootstrap'

const Topbar = ({ userInfo, image }) => {
  return (
    <>
      {userInfo &&
        (
          <Row className="text-center items-center border border-dark flex-nowrap">
            <p className="my-auto p-2">Search Bar</p>

            <div className="my-auto ml-auto mr-3">
              <Dropdown style={{ outline: "none" }}>
                <Dropdown.Toggle variant="light" style={{ borderRadius: "35px" }}>
                  <div className="d-inline-flex">
                    <div className="px-1 my-auto">{userInfo.display_name}</div>
                    <img src={image} className="rounded-circle" width="40px"></img>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="light">
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/action-3">Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Row>
        )
      }
    </>
  )
}

export default Topbar