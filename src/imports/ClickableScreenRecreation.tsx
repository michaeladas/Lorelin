import svgPaths from "./svg-n9pd492ljk";

function Text() {
  return (
    <div className="h-[16px] relative shrink-0 w-[16.594px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[16.594px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">GP</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-black relative rounded-[3.35544e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Text />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[57.234px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[57.234px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Acctual</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[32px] items-center left-[24px] top-[24px] w-[208px]" data-name="Container">
      <Container />
      <Text1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32c00400} id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2f10900} id="Vector_2" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[10px] top-0 w-[232px]" data-name="Button">
      <Icon />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[68px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-[8px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Invoices</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="List Item">
      <Button />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p35993080} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 6.66667H14.6667" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[10px] top-0 w-[232px]" data-name="Button">
      <Icon1 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[72.5px] not-italic text-[#4a5565] text-[14px] text-center text-nowrap top-[8px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Payments</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="List Item">
      <Button1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p5a98780} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18f4d100} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.6667V4.33333" id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[10px] top-0 w-[232px]" data-name="Button">
      <Icon2 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[53px] not-italic text-[#4a5565] text-[14px] text-center text-nowrap top-[8px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Bills</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="List Item">
      <Button2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3baa1080} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[10px] top-0 w-[232px]" data-name="Button">
      <Icon3 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[69.5px] not-italic text-[#4a5565] text-[14px] text-center text-nowrap top-[8px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Contacts</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="List Item">
      <Button3 />
    </div>
  );
}

function List() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[156px] items-start left-[12px] top-[80px] w-[232px]" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
    </div>
  );
}

function Button4() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Support</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Guides</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center px-[12px] py-[8px] relative rounded-[10px] shrink-0" data-name="Button">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Settings</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[4px] h-[148px] items-start pb-0 pt-[16px] px-[12px] relative shrink-0" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[15.734px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[16px] items-start relative w-[15.734px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center text-nowrap whitespace-pre">AS</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#d1d5dc] relative rounded-[3.35544e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.016px] py-0 relative size-[32px]">
        <Text2 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[90px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[90px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Alex Smith</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[48px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[48px] items-center px-[12px] py-0 relative w-full">
          <Container3 />
          <Text3 />
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 px-0 py-px top-[773px]" data-name="Container">
      <Container2 />
      <Button7 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="bg-[#f5f5f7] h-[986px] relative shrink-0 w-[186px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[986px] relative w-[186px]">
        <Container1 />
        <List />
        <Container4 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[36px] relative shrink-0 w-[106.078px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-start relative w-[106.078px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[36px] not-italic relative shrink-0 text-[30px] text-neutral-950 text-nowrap tracking-[0.3955px] whitespace-pre">Header</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-black h-[40px] relative rounded-[10px] shrink-0 w-[135.078px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[40px] relative w-[135.078px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[68.5px] not-italic text-[16px] text-center text-nowrap text-white top-[8px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Create invoice</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Button8 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[#101828] box-border content-stretch flex h-[19px] items-start left-[46.53px] px-[8px] py-[2px] rounded-[3.35544e+07px] top-px w-[24px]" data-name="Text">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-center text-nowrap text-white whitespace-pre">0</p>
    </div>
  );
}

function Container6() {
  return <div className="absolute bg-[#d1d5dc] h-px left-0 top-[31px] w-[74.531px]" data-name="Container" />;
}

function Button9() {
  return (
    <div className="absolute h-[32px] left-0 top-0 w-[74.531px]" data-name="Button">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-[21px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Draft</p>
      <Text4 />
      <Container6 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[21px] items-start left-[57.92px] px-[9px] py-[3px] rounded-[3.35544e+07px] top-0 w-[25.563px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center text-nowrap whitespace-pre">0</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute h-[32px] left-[98.53px] top-0 w-[87.484px]" data-name="Button">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[27.5px] not-italic text-[#6a7282] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Unpaid</p>
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[21px] items-start left-[39.81px] px-[9px] py-[3px] rounded-[3.35544e+07px] top-0 w-[25.563px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-center text-nowrap whitespace-pre">0</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute h-[32px] left-[210.02px] top-0 w-[69.375px]" data-name="Button">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[18.5px] not-italic text-[#6a7282] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Paid</p>
      <Text6 />
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute h-[32px] left-[303.39px] top-0 w-[36.484px]" data-name="Button">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[18.5px] not-italic text-[#6a7282] text-[14px] text-center text-nowrap top-0 tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Void</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[32px] relative shrink-0 w-[958px]" data-name="Container">
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
    </div>
  );
}

function Container8() {
  return (
    <div className="box-border content-stretch flex flex-col h-[33px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Container7 />
    </div>
  );
}

function Container9() {
  return <div className="absolute bg-gray-200 h-[32px] left-0 rounded-[4px] top-0 w-[96px]" data-name="Container" />;
}

function Container10() {
  return <div className="absolute bg-gray-100 h-[16px] left-0 rounded-[4px] top-[40px] w-[128px]" data-name="Container" />;
}

function Container11() {
  return <div className="absolute bg-gray-100 h-[16px] left-0 rounded-[4px] top-[60px] w-[112px]" data-name="Container" />;
}

function Container12() {
  return (
    <div className="h-[76px] relative shrink-0 w-[128px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[76px] relative w-[128px]">
        <Container9 />
        <Container10 />
        <Container11 />
      </div>
    </div>
  );
}

function Container13() {
  return <div className="absolute bg-gray-200 h-[24px] left-0 rounded-[4px] top-0 w-[128px]" data-name="Container" />;
}

function Container14() {
  return <div className="absolute bg-gray-100 h-[16px] left-[32px] rounded-[4px] top-[32px] w-[96px]" data-name="Container" />;
}

function Container15() {
  return <div className="absolute bg-gray-100 h-[16px] left-[48px] rounded-[4px] top-[52px] w-[80px]" data-name="Container" />;
}

function Container16() {
  return (
    <div className="h-[76px] relative shrink-0 w-[128px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[76px] relative w-[128px]">
        <Container13 />
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex h-[76px] items-start justify-between left-0 top-0 w-[672px]" data-name="Container">
      <Container12 />
      <Container16 />
    </div>
  );
}

function Container18() {
  return <div className="absolute bg-gray-200 h-[16px] left-0 rounded-[4px] top-0 w-[80px]" data-name="Container" />;
}

function Container19() {
  return <div className="absolute bg-gray-100 h-[16px] left-0 rounded-[4px] top-[24px] w-[128px]" data-name="Container" />;
}

function Container20() {
  return <div className="absolute bg-gray-100 h-[16px] left-0 rounded-[4px] top-[44px] w-[112px]" data-name="Container" />;
}

function Container21() {
  return (
    <div className="h-[60px] relative shrink-0 w-[128px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[60px] relative w-[128px]">
        <Container18 />
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function Container22() {
  return <div className="absolute bg-gray-200 h-[16px] left-0 rounded-[4px] top-0 w-[96px]" data-name="Container" />;
}

function Container23() {
  return <div className="absolute bg-gray-100 h-[16px] left-[16px] rounded-[4px] top-[24px] w-[80px]" data-name="Container" />;
}

function Container24() {
  return (
    <div className="h-[60px] relative shrink-0 w-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[60px] relative w-[96px]">
        <Container22 />
        <Container23 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[60px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return <div className="absolute bg-gray-200 h-[12px] left-0 rounded-[4px] top-0 w-[96px]" data-name="Container" />;
}

function Container27() {
  return <div className="absolute bg-gray-100 h-[16px] left-0 rounded-[4px] top-[20px] w-[80px]" data-name="Container" />;
}

function Container28() {
  return (
    <div className="h-[36px] relative shrink-0 w-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[96px]">
        <Container26 />
        <Container27 />
      </div>
    </div>
  );
}

function Container29() {
  return <div className="bg-gray-200 h-[12px] rounded-[4px] shrink-0 w-full" data-name="Container" />;
}

function Container30() {
  return <div className="bg-gray-100 h-[16px] rounded-[4px] shrink-0 w-full" data-name="Container" />;
}

function Container31() {
  return (
    <div className="h-[36px] relative shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[36px] items-start relative w-[80px]">
        <Container29 />
        <Container30 />
      </div>
    </div>
  );
}

function Container32() {
  return <div className="absolute bg-gray-200 h-[12px] left-0 rounded-[4px] top-0 w-[64px]" data-name="Container" />;
}

function Container33() {
  return <div className="absolute bg-gray-100 h-[16px] left-0 rounded-[4px] top-[20px] w-[80px]" data-name="Container" />;
}

function Container34() {
  return (
    <div className="h-[36px] relative shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[80px]">
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex gap-[32px] h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container31 />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[120px] items-start left-0 top-[124px] w-[672px]" data-name="Container">
      <Container25 />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-gray-200 h-[16px] relative rounded-[4px] shrink-0 w-[128px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] w-[128px]" />
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-gray-200 h-[16px] relative rounded-[4px] shrink-0 w-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] w-[64px]" />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-gray-100 h-[16px] relative rounded-[4px] shrink-0 w-[192px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] w-[192px]" />
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-gray-100 h-[16px] relative rounded-[4px] shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] w-[80px]" />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[82px] items-start left-0 pb-px pt-[17px] px-0 top-[276px] w-[672px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container39 />
      <Container42 />
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-gray-200 h-[20px] relative rounded-[4px] shrink-0 w-[96px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] w-[96px]" />
    </div>
  );
}

function Container45() {
  return (
    <div className="bg-gray-200 h-[20px] relative rounded-[4px] shrink-0 w-[112px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] w-[112px]" />
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start justify-between left-0 top-[382px] w-[672px]" data-name="Container">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[402px] relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container36 />
      <Container43 />
      <Container46 />
    </div>
  );
}

function InvoicePreview() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[468px] items-start left-0 opacity-30 pb-px pt-[33px] px-[143px] rounded-[10px] top-0 w-[958px]" data-name="InvoicePreview">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container47 />
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[468px] relative shrink-0 w-[958px]" data-name="Container">
      <InvoicePreview />
    </div>
  );
}

function InvoicesContent() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="InvoicesContent">
      <div aria-hidden="true" className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[17px] items-start px-[33px] py-[25px] relative w-full">
          <Container5 />
          <Container8 />
          <Container48 />
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 bg-[#f5f5f7] grow h-[986px] min-h-px min-w-px relative shrink-0" data-name="Main Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[986px] items-start pb-0 pt-[32px] px-[60px] relative w-full">
          <InvoicesContent />
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex h-[986px] items-start left-0 overflow-clip top-0 w-[1431px]" data-name="Container">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default function ClickableScreenRecreation() {
  return (
    <div className="bg-[#f5f5f7] relative size-full" data-name="Clickable Screen Recreation">
      <Container49 />
    </div>
  );
}