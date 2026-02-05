import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: string;
  className?: string;
  imageSrc: string;
}

const LogoContainer = styled(motion.div)<{ size?: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #396057ff;
  font-weight: bold;
  font-size: ${(props) => props.size || '1.5rem'};
`;

const LogoText = styled.span`
  font-family: 'Fira Code', monospace;
  letter-spacing: 1px;
`;

const AvatarImage = styled.img<{ size?: string }>`
  height: ${(props) => props.size || '3rem'};
  width: ${(props) => props.size || '3rem'};
  border-radius: 50%;
  object-fit: cover;
`;

const Logo: React.FC<LogoProps> = ({ size, className, imageSrc }) => {
  return (
    <LogoContainer
      size={size}
      className={className}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {imageSrc ? <AvatarImage src={imageSrc} alt="Avatar" size={size} /> : <LogoText>C</LogoText>}
    </LogoContainer>
  );
};

export default Logo;
