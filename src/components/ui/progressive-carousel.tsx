import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  FC,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressSliderContextType {
  active: string;
  progress: number;
  handleButtonClick: (value: string) => void;
  vertical: boolean;
}

interface ProgressSliderProps {
  children: ReactNode;
  duration?: number;
  fastDuration?: number;
  vertical?: boolean;
  activeSlider: string;
  className?: string;
  items?: string[];
}

interface SliderContentProps {
  children: ReactNode;
  className?: string;
}

interface SliderWrapperProps {
  children: ReactNode;
  value: string;
  className?: string;
}

interface ProgressBarProps {
  children: ReactNode;
  className?: string;
}

interface SliderBtnProps {
  children: ReactNode;
  value: string;
  className?: string;
  progressBarClass?: string;
}

const ProgressSliderContext = createContext<
  ProgressSliderContextType | undefined
>(undefined);

export const useProgressSliderContext = (): ProgressSliderContextType => {
  const context = useContext(ProgressSliderContext);
  if (!context) {
    throw new Error(
      'useProgressSliderContext must be used within a ProgressSlider'
    );
  }
  return context;
};

export const ProgressSlider: FC<ProgressSliderProps> = ({
  children,
  duration = 5000,
  fastDuration = 400,
  vertical = false,
  activeSlider,
  className,
  items,
}) => {
  const [active, setActive] = useState<string>(activeSlider);
  const [progress, setProgress] = useState<number>(0);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);
  const frame = useRef<number>(0);
  const firstFrameTime = useRef<number>(performance.now());
  const targetValue = useRef<string | null>(null);
  const [sliderValues, setSliderValues] = useState<string[]>(items || []);

  useEffect(() => {
    if (items && items.length > 0) {
      setSliderValues(items);
      return;
    }
    
    // Fallback to parsing children if items prop is not provided
    try {
        const getChildren = React.Children.toArray(children).find(
          (child: any) => child?.type?.name === 'SliderContent' || child?.type === SliderContent
        ) as React.ReactElement | undefined;
    
        if (getChildren) {
          const values = React.Children.toArray(getChildren.props.children).map(
            (child: any) => child?.props?.value as string
          ).filter(Boolean);
          if (values.length > 0) {
            setSliderValues(values);
          }
        }
    } catch (e) {
        console.error("ProgressSlider: Could not parse children to find values", e);
    }
  }, [children, items]);

  useEffect(() => {
    if (sliderValues.length > 0) {
      firstFrameTime.current = performance.now();
      frame.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, [sliderValues, active, isFastForward]);

  const animate = (now: number) => {
    const currentDuration = isFastForward ? fastDuration : duration;
    const elapsedTime = now - firstFrameTime.current;
    const timeFraction = elapsedTime / currentDuration;

    if (timeFraction <= 1) {
      setProgress(
        isFastForward
          ? progress + (100 - progress) * timeFraction
          : timeFraction * 100
      );
      frame.current = requestAnimationFrame(animate);
    } else {
      if (isFastForward) {
        setIsFastForward(false);
        if (targetValue.current !== null) {
          setActive(targetValue.current);
          targetValue.current = null;
        }
      } else {
        const currentIndex = sliderValues.indexOf(active);
        const nextIndex = (currentIndex + 1) % sliderValues.length;
        setActive(sliderValues[nextIndex]);
      }
      setProgress(0);
      firstFrameTime.current = performance.now();
    }
  };

  const handleButtonClick = (value: string) => {
    if (value !== active && sliderValues.includes(value)) {
      const elapsedTime = performance.now() - firstFrameTime.current;
      const currentProgress = (elapsedTime / duration) * 100;
      setProgress(currentProgress);
      targetValue.current = value;
      setIsFastForward(true);
      firstFrameTime.current = performance.now();
    }
  };

  return (
    <ProgressSliderContext.Provider
      value={{ active, progress, handleButtonClick, vertical }}
    >
      <div className={cn('relative', className)}>{children}</div>
    </ProgressSliderContext.Provider>
  );
};

export const SliderContent: FC<SliderContentProps> = ({
  children,
  className,
}) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const SliderWrapper: FC<SliderWrapperProps> = ({
  children,
  value,
  className,
}) => {
  const { active } = useProgressSliderContext();

  return (
    <AnimatePresence mode='popLayout'>
      {active === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn('', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SliderBtnGroup: FC<ProgressBarProps> = ({
  children,
  className,
}) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const SliderBtn: FC<SliderBtnProps> = ({
  children,
  value,
  className,
  progressBarClass,
}) => {
  const { active, progress, handleButtonClick, vertical } =
    useProgressSliderContext();

  return (
    <button
      className={cn(
        `relative z-0 ${active === value ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`,
        className
      )}
      onClick={() => handleButtonClick(value)}
    >
      {children}
      <div
        className='absolute inset-0 overflow-hidden -z-10 max-h-full max-w-full'
        role='progressbar'
        aria-valuenow={active === value ? progress : 0}
      >
        <span
          className={cn('absolute top-0 left-0 block', progressBarClass)}
          style={{
            [vertical ? 'height' : 'width']:
              active === value ? `${progress}%` : '0%',
          }}
        />
      </div>
    </button>
  );
};
