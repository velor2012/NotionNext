import {   motion } from "framer-motion";
const Card = (props) => {
  const { children, headerSlot } = props
  return <motion.div {...props}>
    <>{headerSlot}</>
    <section className="shadow px-2 py-4 rounded-md bg-white dark:bg-hexo-black-gray hover:shadow-xl duration-200">
        {children}
    </section>
  </motion.div>
}
export default Card
