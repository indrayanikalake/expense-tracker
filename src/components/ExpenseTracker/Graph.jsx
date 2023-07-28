import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { SectionWrapper } from '../../hoc';
import { Chart, ArcElement, } from 'chart.js';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { useSelector } from 'react-redux';
import { fadeIn, slideIn,staggerContainer } from '../../utils/motion';
Chart.register(ArcElement);

const Graph = () => {
    const expenses = useSelector((state)=>state.expenses.expenses);
    console.log(expenses);

    const categories = Object.values(expenses).map((expense)=>expense.category);
    console.log(categories);

    const categoryCount = categories.reduce((counts, category) =>{
    counts[category]= (counts[category] || 0)+1;
    return counts},{});
    console.log(categoryCount);
    
    const totalAmount = Object.values(expenses).reduce((total, expense)=>total+expense.expense,0);

    console.log(totalAmount);

      const percentageData = Object.keys(categoryCount).map((category) => {
        const percentage = ((100/(categories.length))*categoryCount[category]).toFixed(1);
        return { category, percentage };
      });

      const config = {
        data:{
        datasets: [
          {
            label: 'My First Dataset',
            data: Object.values(categoryCount),
            backgroundColor: [
              'rgb(139, 0, 0)',
              'rgb(0, 100, 0)',
              'rgb(0, 0, 139)',
              'rgb(128, 0, 128)',
              'rgb(165, 42, 42)',
    
            ],
            hoverOffset: 4,
            borderRadius:30,
            spacing:10,
            
          },
        ],
    },
    options:{
        cutout:115
    }
      };
     
  return (
    
      <motion.div
      variants={[staggerContainer(), fadeIn("up","tween",0.2,0.7)]}
      initial="hidden"
      whileInView={"show"}
      viewport={{once:true, amount:0.5}}
      className=' flex lg:flex-row'
      >
        
        <Tilt className=' w-[300px] h-[280px] green-pink-gradient  '
         options={{
            max:45,
            scale:1,
            speed:450
          }}
        >
     
      <Doughnut className='jusify-center items-center  green-pink-gradient ' {...config}></Doughnut>
     <p className='orange-text-gradient font-bold b-corner text-[50px] mr-9'
     style={{margin:'-2.8rem 3.8rem'}}>${totalAmount}</p>
      
      </Tilt>
      <Tilt className='w-[440px] green-pink-gradient'>
     
        {percentageData.map(({category, percentage})=>(
            
                <ul className='flex flex-row gap-8  mt-5 mx-12 bg-transparent '>
                    
            <li className='pink-text-gradient font-bold text-[20px]'>{category}</li>
            <li className='orange-text-gradient font-bold text-[20px]'>{percentage}%</li>
            </ul>
            
        ))}
        
      </Tilt>
      
      </motion.div>
       
    )
}

export default Graph;
