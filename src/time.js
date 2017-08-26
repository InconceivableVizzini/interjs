let Now = (typeof window !== 'undefined' &&
	   window.performance !== undefined &&
	   window.performance.now !== undefined) ?
    window.performance.now.bind(window.performance) :
    ((Date.now !== undefined) ? Date.now :() => {return new Date().getTime()} );
export default Now;
