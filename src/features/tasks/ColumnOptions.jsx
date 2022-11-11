import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetColumnsByProjectIdQuery } from "./columnsSlice";
import { RadioGroup } from "@headlessui/react";

const ColumnOptions = ({ register }) => {
  const { projectId } = useParams();
  const { data: columns } = useGetColumnsByProjectIdQuery(projectId);

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup {...register("columnId")}>
          <RadioGroup.Label className="sr-only">Task Status</RadioGroup.Label>
          <div className="space-y-2">
            {columns?.map((col) => (
              <RadioGroup.Option
                key={col.id}
                value={col.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-black ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-black" : "text-gray-900"
                            }`}
                          >
                            {col.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="black" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="black"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ColumnOptions;

/**
 * <div>
      <div className="flex flex-row space-x-8">
        <RadioGroup
          value={selectedColumn}
          onChange={setSelectedColumn}
          name="columnId"
        >
          <RadioGroup.Label
            htmlFor="column-options"
            className="block text-sm text-gray-900 mb-3 font-medium"
          >
            Task Status
          </RadioGroup.Label>
          <div className="flex flex-row space-x-4">
            {columns.map((column) => (
              <RadioGroup.Option key={column.id} value={column.id}>
                {column.name}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
 */
