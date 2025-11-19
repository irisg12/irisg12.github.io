import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <h1> uh oh wrong page</h1>
        <Link to="/about">back to main</Link>
    </>
  )
}