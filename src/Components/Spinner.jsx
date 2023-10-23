export default function SpinnerLarge({size}) {
  let spinnerSize = 'min-h-[60px] min-w-[60px]'
  let containerSize = 'min-h-[220px]'
  switch (size) {
    case 'sm':
      spinnerSize = 'min-h-[20px] min-w-[20px]'
      containerSize = 'min-h-[150px]'
      break;
    case 'md':
      spinnerSize = 'min-h-[60px] min-w-[60px]'
      containerSize = 'min-h-[220px]'
      break;

    case 'lg':
      spinnerSize = 'min-h-[100px] min-w-[100px]'
      containerSize = 'min-h-[400px]'
      break;

    case 'xl':
      spinnerSize = 'min-h-[140px] min-w-[140px]'
      containerSize = 'min-h-[300px]'
      break;
    
}
  return (
    <div className={`flex justify-center items-center ${containerSize}`}>
      <div
        className={`inline-block ${spinnerSize} animate-spin rounded-full border-4 border-solid border-primary-300 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
