export default function SectionHead({title="",short_desc="",...props}){
    return (
        <div {...props}>
            <h5 className="font-semibold text-3xl leading-normal mb-4">{title}</h5>
            <p className="text-slate-400 max-w-xl mx-auto">{short_desc}</p>
        </div>
    );
}