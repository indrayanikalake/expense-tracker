import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';
import { styles } from '../styles';

const SectionWrapper = (Component, idName) => 
function HOC (){
  return (
    <motion.section
    variants={staggerContainer()}
    initial="hidden"
    whileInView={"show"}
    viewport={{once:true, amount:0.5}}
    
    >
        <span
        className='hash-span' id={idName}>&nbsp;</span>
        <Component />
    </motion.section>
  )
}

export default SectionWrapper
