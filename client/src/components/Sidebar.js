import { BsHouse, BsWindowDock, BsPeople, BsBookmarks } from 'react-icons/bs'
import { Container, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import QuickPlayer from './QuickPlayer'

const Sidebar = () => {
  const accessToken = sessionStorage.getItem('code')
  return (
    <>
      <style type="text/css">
        {`
        .gradient {
          background-image: linear-gradient(45deg, #ffcca6, #FA9284);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .selected {
          color: #fabd8e !important;
          font-weight: 600 !important;
        }
      `}
      </style>
      <Container className="p-0">
        <Row className="pt-2">
          <div className="ml-3 mr-2">
            <svg width="50" height="50" viewBox="0 0 830 774" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M537.963 37.9979C537.963 58.9269 520.997 75.8931 500.068 75.8931C498.182 75.8931 496.329 75.7554 494.517 75.4895L424.918 205.379C439.828 215.28 449.657 232.224 449.657 251.463C449.657 265.285 444.584 277.922 436.199 287.614L557.552 404.868C565.418 399.129 575.11 395.743 585.593 395.743C592.784 395.743 599.602 397.336 605.715 400.189L649.849 312.429C639.735 304.608 633.223 292.355 633.223 278.581C633.223 254.963 652.368 235.818 675.985 235.818C699.602 235.818 718.748 254.963 718.748 278.581C718.748 290.14 714.161 300.629 706.708 308.325L779.832 380.939C784.944 377.551 791.075 375.578 797.667 375.578C815.524 375.578 830 390.054 830 407.911C830 425.768 815.524 440.244 797.667 440.244C779.811 440.244 765.335 425.768 765.335 407.911C765.335 400.962 767.527 394.525 771.258 389.254L697.203 315.716C690.95 319.297 683.707 321.343 675.985 321.343C670.424 321.343 665.111 320.282 660.238 318.35L615.86 406.595C626.463 415.331 633.223 428.562 633.223 443.373C633.223 458.547 626.127 472.063 615.073 480.786L676.625 595.116C679.648 593.89 682.953 593.215 686.415 593.215C700.816 593.215 712.49 604.889 712.49 619.29C712.49 633.691 700.816 645.365 686.415 645.365C672.015 645.365 660.341 633.691 660.341 619.29C660.341 612.7 662.785 606.681 666.817 602.09L604.833 486.957C598.949 489.558 592.44 491.003 585.593 491.003C568.644 491.003 553.763 482.149 545.321 468.815L423.401 538.322C425.545 544.401 426.711 550.941 426.711 557.754C426.711 577.792 416.62 595.474 401.242 605.994L453.657 709.831C455.519 709.505 457.435 709.335 459.391 709.335C477.44 709.335 492.072 723.811 492.072 741.667C492.072 759.524 477.44 774 459.391 774C441.343 774 426.711 759.524 426.711 741.667C426.711 729.966 432.994 719.716 442.405 714.04L390.743 611.695C383.835 614.572 376.255 616.161 368.304 616.161C352.934 616.161 338.952 610.225 328.523 600.52L255.639 660.974C257.423 664.062 258.442 667.634 258.442 671.44C258.442 683.152 248.792 692.647 236.887 692.647C224.983 692.647 215.332 683.152 215.332 671.44C215.332 659.727 224.983 650.232 236.887 650.232C240.518 650.232 243.938 651.115 246.94 652.675L320.651 591.534C313.878 581.998 309.896 570.341 309.896 557.754C309.896 542.692 315.598 528.962 324.959 518.604L221.508 408.494C214.886 413.579 206.597 416.603 197.601 416.603C190.751 416.603 184.309 414.849 178.702 411.766L111.952 508.964C118.196 514.257 122.159 522.157 122.159 530.984C122.159 546.92 109.239 559.84 93.3026 559.84C77.3659 559.84 64.4466 546.92 64.4466 530.984C64.4466 515.047 77.3659 502.128 93.3026 502.128C96.1044 502.128 98.8129 502.527 101.374 503.272L169.219 404.48C162.465 397.425 158.316 387.855 158.316 377.317C158.316 370.017 160.307 363.181 163.776 357.325L43.1191 257.032C38.5737 260.765 32.793 263 26.5 263C11.8645 263 0 250.912 0 236C0 221.088 11.8645 209 26.5 209C41.1355 209 53 221.088 53 236C53 240.573 51.884 244.881 49.9144 248.656L170.492 348.883C177.542 342.159 187.09 338.031 197.601 338.031C210.75 338.031 222.39 344.49 229.521 354.409L343.943 274.122C340.831 267.207 339.1 259.537 339.1 251.463C339.1 220.933 363.849 196.184 394.379 196.184C401.407 196.184 408.128 197.496 414.312 199.888L482.94 71.8107C470.617 65.5562 462.173 52.7632 462.173 37.9979C462.173 17.0689 479.139 0.102661 500.068 0.102661C520.997 0.102661 537.963 17.0689 537.963 37.9979ZM548.849 413.065C542.049 421.299 537.963 431.859 537.963 443.373C537.963 448.463 538.762 453.367 540.24 457.965L418.274 527.499C410.919 515.376 399.277 506.144 385.451 501.904L398.385 306.598C409.24 305.821 419.227 301.909 427.447 295.763L548.849 413.065ZM386.445 306.176L373.636 499.587C371.88 499.428 370.102 499.346 368.304 499.346C355.409 499.346 343.49 503.525 333.828 510.602L229.781 399.858C234.259 393.478 236.887 385.704 236.887 377.317C236.887 371.883 235.784 366.706 233.789 361.999L235.671 364.682L350.016 284.449C358.599 295.972 371.564 304.037 386.445 306.176Z" fill="url(#paint0_linear_15_882)" />
              <defs>
                <linearGradient id="paint0_linear_15_882" x1="415" y1="0.102661" x2="415" y2="774" gradientUnits="userSpaceOnUse">
                  <stop offset="0.305879" stopColor="#FA9284" stopOpacity="0.66" />
                  <stop offset="1" stopColor="#12C2E9" stopOpacity="0.68" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="gradient text-center mb-4">graphify</h1>
        </Row>
        <Row className={`d-flex align-content-start ml-2 ${window.location.pathname === "/dashboard" ? "selected " : "text-muted"}`}>
          <div style={{ marginTop: "2px" }}><BsHouse /></div>
          <div className={`ml-3 pt-1`} style={{ fontSize: "16px" }}> Home</div>
        </Row>
        <Row className={`d-flex align-content-start ml-2 mt-2 ${window.location.pathname === "/forum" ? "selected " : "text-muted"}`}>
          <div style={{ marginTop: "2px" }}><BsWindowDock /></div>
          <div className="text-muted ml-3 pt-1" style={{ fontSize: "16px" }}> Forum</div>
        </Row>
        <Row className={`d-flex align-content-start ml-2 mt-2 ${window.location.pathname === "/friend-network" ? "selected " : "text-muted"}`}>
          <div style={{ marginTop: "2px" }}><BsPeople /></div>
          <div className="text-muted ml-3 pt-1" style={{ fontSize: "16px" }}> Friend Network</div>
        </Row>
        <Row className={`d-flex align-content-start ml-2 mt-2 ${window.location.pathname === "/library" ? "selected " : "text-muted"}`}>
          <div style={{ marginTop: "2px" }}><BsBookmarks /></div>
          <div className="text-muted ml-3 pt-1" style={{ fontSize: "16px" }}> Library</div>
        </Row>
        <Row className="ml-1 mt-4">
          <p className='pt-1 pl-1 mb-0 border-bottom w-100 mr-2' style={{ fontSize: "14px" }}>Quick Player</p>
          <QuickPlayer></QuickPlayer>
        </Row>
      </Container>
    </>
  )
}

export default Sidebar 
