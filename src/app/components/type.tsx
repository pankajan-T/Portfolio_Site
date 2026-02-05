import styled from 'styled-components';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const TypeContainer = styled(motion.div)`
  font-size: 1.5rem;
  color: #708a84ff;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

function Type() {
  return (
    <TypeContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Typewriter
        options={{
          strings: ['Senior DSP/FPGA Engineer', 'UoM ENTC Graduate', 'VLSI Researcher', 'Digital Design Architect', 'Quantum Computing Enthusiast', 'Neuromorphic Computing Explorer'],
          autoStart: true,
          loop: true,
          deleteSpeed: 100,
          wrapperClassName: 'typewriter-text',
          cursorClassName: 'typewriter-cursor',
        }}
      />
    </TypeContainer>
  );
}

export default Type;
