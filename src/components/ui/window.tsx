import * as React from 'react';
import { Button } from '@/components/ui/button/index';
import cn from '@/utils/cn';
import WindowDetail from '@/assets/svgs/windowdetail.svg?react';

interface WindowWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  showButtons?: boolean;
  headerClasses?: string;
  windowTitleClasses?: string;
  windowTitle?: string;
  isBaloonChat?: boolean;
  minimizeButton?: () => void;
  closeButton?: () => void;
  variant?: 'pink' | 'blue';
}

const WindowWrapper = React.forwardRef<HTMLDivElement, WindowWrapperProps>(
  (
    {
      className, // root classes
      isBaloonChat,
      windowTitle,
      windowTitleClasses,
      minimizeButton,
      closeButton,
      headerClasses,
      showButtons = false,
      children,
      variant = 'pink',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col shadow-(--shadow-window) rounded-lg relative min-w-12.5 border-2 border-[#221208]',
          className,
          isBaloonChat ? '' : 'rounded-lg overflow-clip'
        )}
        {...props}
      >
        <div
          className={cn(
            'px-3.5 py-3 w-full h-12.5 gap-5 flex flex-row items-center justify-between rounded-t-lg border-b-2  border-[#221208]',
            windowTitle ? 'justify-between' : 'justify-end',
            headerClasses,
            variant === 'pink' ? 'bg-[#E9D3DF]' : 'bg-[#82AADE]'
          )}
        >
          {windowTitle ? (
            <h3 className={cn('text-[40px]', windowTitleClasses)}>{windowTitle}</h3>
          ) : (
            ''
          )}

          {showButtons ? (
            <div className="flex flex-row gap-1.25">
              <Button
                asChild={false}
                className="p-2.5 w-5 h-5 gap-2.5 rounded-[3px] border bg-[#F2F2E8]"
              >
                _
              </Button>

              <Button
                asChild={false}
                className="p-2.5 w-5 h-5 gap-2.5 rounded-[3px] border bg-[#F2F2E8]"
              >
                □
              </Button>
              <Button
                type="button"
                onClick={closeButton}
                asChild={false}
                className="p-2.5 w-5 h-5 gap-2.5 rounded-[3px] border bg-[#F2F2E8] transition duration-300 ease-in-out hover:cursor-pointer hover:scale-[1.05]"
              >
                X
              </Button>
            </div>
          ) : (
            <div className="flex flex-row gap-1.25">
              {[...Array(3)].map((_, index) => (
                <Button
                  // eslint-disable-next-line react/no-array-index-key
                  key={`button-${index}`}
                  asChild={false}
                  className={cn(
                    'p-2.5 w-5 h-5 gap-2.5 rounded-[3px] border',
                    variant === 'pink' ? 'bg-[#E9D3DF]' : 'bg-[#82AADE]'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <div className=" w-full min-h-12.5  rounded-bl-sm bg-[#F2F2E8]">{children}</div>

        {isBaloonChat ? (
          <WindowDetail className="absolute -bottom-9.75 right-0 fill-white w-10 h-10 " />
        ) : (
          ''
        )}
      </div>
    );
  }
);

WindowWrapper.displayName = 'WindowWrapper';

export default WindowWrapper;
